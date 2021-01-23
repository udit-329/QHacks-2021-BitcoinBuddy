from firebase import firebase

class fire_base_app():
    def __init__(self):
        self.firebase = firebase.FirebaseApplication('https://qhacks-31646-default-rtdb.firebaseio.com/', None)

    def add_data(self, name, data):
        result = self.firebase.post('/%s' % name, data)

        print(result)
        print("data added.")


    def delete_data(self, name):
        result = self.firebase.get('/%s' % name, '')
        for key in result.keys():
            self.firebase.delete('/%s' % name, key)

        print("data deleted.")


if __name__ == '__main__':
    firebase_app = fire_base_app()
    #firebase_app.add_data('test_data', {'name':'test'})
    firebase_app.delete_data("test_data")
