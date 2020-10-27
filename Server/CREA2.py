# Computational Creativity 2020
# This simple FLASK server interfaces with
# the Oracle creator.
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_jsonpify import jsonify

from json import dumps

# INSTALL INSTRUCTIONS
# pipInstall flask flask_cors flask_restful flask_jsonpify

# RUN INSTRUCTIONS
# FLASK_APP=DIPP.py FLASK_ENV=development flask run --port 5002

app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/GetOracle")
def GetOracle():

    from PoemGenerator import PoemGenerator
    pg = PoemGenerator()

    return jsonify(pg.oracle)

# MAIN
if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5002)
