import connexion

app = connexion.App(__name__, specification_dir='./')
app.add_api('app.yml')

@app.route('/')
def index():
    print("App is running")

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)




