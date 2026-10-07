#!/usr/bin/env python3
"""Local preview of mayo-site/ that behaves like Netlify for our purposes.

- Clean URLs: /join serves join.html; unknown paths get 404.html with status 404.
- Forms: a POST is answered by a MOCK, never by Netlify, so testing can't reach
  the club's real inbox. Each submission is appended to tools/.dev-inbox.jsonl
  (gitignored). To exercise the page's other states, submit with one of these
  exact names:
      "Test Failure"   -> 500 (the page must keep the input and show an error)
      "Test Slow"      -> waits 4 s, then 200 (shows the sending state)
      "Test Offline"   -> drops the connection (network error)
  A POST without form-name gets 400, like a form Netlify doesn't know.

usage: python3 tools/serve.py [port]   (default 8150; serves ../mayo-site)
"""
import http.server, io, json, os, sys, time, functools, urllib.parse, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(os.path.dirname(HERE), "mayo-site")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8150
INBOX = os.path.join(HERE, ".dev-inbox.jsonl")


class Handler(http.server.SimpleHTTPRequestHandler):
    def _route(self):
        path = urllib.parse.urlsplit(self.path).path
        fs = os.path.join(ROOT, path.lstrip("/"))
        if path != "/" and not os.path.exists(fs):
            if os.path.exists(fs + ".html"):
                rest = self.path[len(path):]
                self.path = path + ".html" + rest
            else:
                return "404"
        return None

    def send_head(self):
        if self._route() == "404":
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return io.BytesIO(body)
        return super().send_head()

    def do_POST(self):
        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length).decode("utf-8", "replace")
        fields = {k: v[0] for k, v in urllib.parse.parse_qs(raw, keep_blank_values=True).items()}
        name = fields.get("name", "")
        if name == "Test Offline":
            self.close_connection = True
            self.connection.shutdown(2)
            return
        if name == "Test Slow":
            time.sleep(4)
        if "form-name" not in fields:
            return self._reply(400, "Unknown form")
        if name == "Test Failure":
            return self._reply(500, "Mock failure")
        with open(INBOX, "a") as f:
            f.write(json.dumps({"at": datetime.datetime.now().isoformat(timespec="seconds"),
                                "path": self.path, "fields": fields}) + "\n")
        return self._reply(200, "Mock success: saved to tools/.dev-inbox.jsonl")

    def _reply(self, status, text):
        body = text.encode()
        self.send_response(status)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print(f"Serving {ROOT} on http://127.0.0.1:{PORT} (forms are mocked; inbox: {INBOX})")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT),
                                    functools.partial(Handler, directory=ROOT)).serve_forever()
