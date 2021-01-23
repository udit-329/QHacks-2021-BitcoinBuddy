from flask import Flask, render_template, request, redirect, Response

app = Flask(__name__)

app.config['SECRET_KEY'] = 'bonjour'