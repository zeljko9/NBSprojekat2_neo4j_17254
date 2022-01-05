import flask
from flask.wrappers import Request
from flask_cors.decorator import cross_origin
from werkzeug.exceptions import HTTPException
import Baza as b
import threading
from flask import Flask, render_template
from flask_cors import CORS, cross_origin



app=Flask(__name__)
cors = CORS(app)
baza=b.Baza()
response=dict()

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/Pretraga')
def main2():
    return render_template("search.html")

@app.route('/PrijaviSlucaj',methods=['POST'])
@cross_origin()
def pretplata():
    poruka=flask.request.json
    pom=list()
    pom.append(poruka['Street'].rsplit(' ', 1)[0])
    pom.append(poruka['Street'].split(' ')[-1])
    poruka['Street']=pom
    pom=str(poruka['alkotest'])
    poruka['alkotest']=pom
    pom=str(poruka['speedtest'])
    poruka['speedtest']=pom
    baza.newCasePolice(poruka)
    print(poruka)
    return flask.json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/GradUpit',methods=['POST'])
@cross_origin()
def gradupit():
    results=list()
    poruka=flask.request.json
    r=baza.returnByCity(poruka['City'])
    for record in r:
        results.append(record[0]._properties)

    response = app.response_class(
        response=flask.json.dumps(results),
        status=200
    )

    return response

@app.route('/UlicaUpit',methods=['POST'])
@cross_origin()
def ulicaupit():
    results=list()
    poruka=flask.request.json
    r=baza.returnByStreet(poruka['City'], poruka['Street'])
    for record in r:
        record[0]._properties['time']=str(record[0]._properties['time'])
        results.append(record[0]._properties)

    response = app.response_class(
        response=flask.json.dumps(results),
        status=200
    )

    return response

@app.errorhandler(HTTPException)
def handle_exception(e):
    print(e)

if __name__ == "__main__":
    threading.Thread(target=lambda: app.run(debug=True, use_reloader=False)).start()

