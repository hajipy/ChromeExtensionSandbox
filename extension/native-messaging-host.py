#!/usr/bin/env python
# coding=utf-8

import struct
import sys


def send_message(message):
    sys.stdout.write(struct.pack("I", len(message)))
    sys.stdout.write(message)
    sys.stdout.flush()


def main():
    send_message('{ "text": "hello from native messaging host" }')

    while 1:
        text_length_bytes = sys.stdin.read(4)

        if len(text_length_bytes) == 0:
            sys.exit(0)

        text_length = struct.unpack("I", text_length_bytes)[0]

        text = sys.stdin.read(text_length).decode("utf-8")

        send_message("{ \"echo\": %s }" % text)


if __name__ == "__main__":
    main()
