from flask import Flask, render_template, request, redirect, Response
import reddit
import fb_class
import pandas as pd
import sys

sys.setrecursionlimit(150000)


app = Flask(__name__)

app.config['SECRET_KEY'] = 'bonjour'

firebase_app = fb_class.fire_base_app()

if __name__ == "__main__":
    data_table = reddit.create_table(reddit.bitcoin)
    data_table.to_csv('out.csv', index=False)
    #firebase_app.add_data("test", data_table)

