#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask
import requests

app = Flask(__name__)

@app.route('/')
def main():
    return("Добро пожаровать на сервис №2 <a href='/service1/temp'>/temp</a>")

@app.route('/temp/')
def temp():

    r = requests.get('https://picsum.photos/500/500')


    return('<img src="https://picsum.photos/500/500"></img>')


if __name__ == '__main__':
    app.run(debug=True, port=5002)
