from flask import Flask, render_template, make_response, json, request, jsonify
import jinja2
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os


app = Flask(__name__)

books = []

@app.route('/book', methods = ['POST'])
def add_book_info():
    r = request.json
    if r["title"]:
        id = len(books) + 1
        r['id'] = id

        books.append(r)

        return make_response(jsonify({"Ratatoskr": "Book add", "id":r['id']}), 200)
    return make_response(jsonify({"Ratatoskr": "Error, incorrect data"}),400)



@app.route('/book/<id>', methods = ['GET'])
def get_book(id):
    print(books)
    for i in books:
        if i['id'] == int(id):
            return make_response(jsonify({"Ratatoskr": i}), 200)
    return make_response(jsonify({"Ratatoskr": "Book not found"}), 400)


@app.route('/book', methods = ['OPTIONS'])
def send_options():
    return make_response(jsonify({"Allow": "GET, OPTION"}), 200)
    
    
@app.route('/book/', methods = ['OPTIONS'])
def send_book_options():
    return make_response(jsonify({"Allow": "GET, DELETE, PUT, OPTION"}), 200)


@app.route('/book/<id>', methods = ['PUT'])
def update_book(id):
    for i in range(len(books)):
        if books[i]['id'] == int(id):
            books[i] = request.json
            books[i]["id"] = int(id)
            
            return make_response(jsonify({"Ratatoskr": "Book update", "title":books[i]['title']}), 200)
    return make_response(jsonify({"Ratatoskr": "Book not found"}), 400)


@app.route('/book/<id>', methods = ['DELETE'])
def delete_book(id):
    for i in range(len(books)):
        if books[i]['id'] == int(id):
            books.pop(i)
            return make_response(jsonify({"Ratatoskr": "Book delete", "id": id}), 200)
    return make_response(jsonify({"Ratatoskr": "Book not found"}), 400)

loader = jinja2.ChoiceLoader([app.jinja_loader, jinja2.FileSystemLoader('static/html')])
app.jinja_loader = loader


@app.route('/', methods = ['GET'])
def index():
    resp = make_response(render_template('hack.txt'))
    resp.headers['Content-type'] = 'text/html; charset=utf-8'
    return resp


@app.route('/hack', methods = ['GET'])
def hack():
    return render_template('index.html')

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/library.log', maxBytes=10240, backupCount=1)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))


    file_handler.setLevel(logging.DEBUG)
    app.logger.addHandler(file_handler)

    # app.logger.setLevel(logging.DEBUG)
    # app.logger.info('Lib startup')


if __name__ == '__main__':
    app.run() #debug=True
