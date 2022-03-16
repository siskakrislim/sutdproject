import flask
import pickle
import numpy as np
from nltk.stem.snowball import SnowballStemmer
import nltk
import gensim
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from gensim.models import word2vec
import string
from string import punctuation
import json
from flask_cors import CORS, cross_origin

#use pickle to load in the pre-trained model
with open(f'model/nlp_model_test.pkl' ,'rb') as f:
    model = pickle.load(f)

app = flask.Flask(__name__, template_folder='templates')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

point_list = []
def calculate_vector(start_point):
    point = 0
    for i in model[start_point]:
        point += word_vector.wv[i]
        point = point/len(model[start_point]) #This is to generate Centroid
    return point_list.append(point)
    
def calculate_distance(list): #This is to generate Distance
    dist_list = []
    for i in list:
        dist = np.linalg.norm(i - point_list[0])
        dist_list.append(dist)
    return dist_list

@app.route('/', methods=['GET','POST'])
@cross_origin()
def main():
    if flask.request.method == 'GET':
        return(flask.render_template('main.html')) #return json
    
    if flask.request.method == 'POST':
        '''
        Sample API input in JSON
        {
          "ClassID": 1,
          "StudentID: 1,
          "GroupNo: 1,
          "WeekNumber": 6, 
          "Sentences": "This is a sentence."
        }
        
        Sample API output in JSON
        {"result": [0.0, 3.880429, 3.4625561, 4.2398853, 2.9729893, 4.0734987]}
        '''
        start_point = flask.request.form['index'] #we will change this to session ID in the future
        total_weeks = flask.request.form['total_weeks'] #we will automate it by counting the total no. of weeks based on the session ID count in the future
        sentences = flask.request.form['sentences']
        
        lemmatizer = WordNetLemmatizer()
        corpus = set(nltk.corpus.words.words())
        stop_words = set(stopwords.words('english'))
        table = str.maketrans('', '', string.punctuation)
        stemmer = SnowballStemmer("english")
      
        tokens = word_tokenize(sentences.lower())S
        stripped = [lemmatizer.lemmatize(line.translate(table), pos='v') for line in tokens]
        words = [lemmatizer.lemmatize((word), pos='v') for word in stripped if word in corpus and not word in stop_words]
        model.append(words)
        
        word_vector = word2vec.Word2Vec(model, vector_size=5, window=20, min_count=1, workers=4)
    
        stop_point = start_point + (total_weeks-1)
        
        for i in range(start_point, stop_point+1, 1):
            calculate_vector(i)
        
        values = calculate_distance(point_list)  #the values to be plotted
        json_values = flask.jsonify(values)
        result = json.loads(json_values)

        return flask.render_template('main.html',original_input = {'Index':start_point, 'Total Weeks':total_weeks, 
                                                                   'Sentences':sentences}, result=result)

if __name__ == '__main__':
    app.run()