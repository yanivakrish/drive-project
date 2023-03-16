import subprocess

from flask import Flask, render_template, send_from_directory, request, redirect
import os

app = Flask(__name__)


@app.route('/')
def index():
    # Get the list of entries in the current directory
    entries = []
    for entry in os.listdir():
        full_path = os.path.join(os.getcwd(), entry)
        entry_info = {
            'name': entry,
            'is_dir': os.path.isdir(full_path)
        }
        entries.append(entry_info)

    # Get the name of the parent directory
    parent_dir = os.path.abspath(os.path.join(os.getcwd(), '..'))

    return render_template('index.html', entries=entries, parent_dir=parent_dir)


@app.route('/files/<path:filename>')
def download_file(filename):
    # Send the requested file to the client
    return send_from_directory(os.getcwd(), filename, as_attachment=True)


@app.route('/change-directory/<path:directory>')
def change_directory(directory):
    # Change to the specified directory
    os.chdir(directory)

    # Redirect the user back to the main file list
    return redirect('/')


@app.route('/delete-entry', methods=['POST'])
def delete_entry():
    # Get the name of the entry to delete
    entry_name = request.form['entry_name']

    # Delete the entry
    os.remove(entry_name)

    # Redirect the user back to the main file list
    return redirect('/')


@app.route('/rename-entry', methods=['POST'])
def rename_entry():
    # Get the name of the entry to rename
    entry_name = request.form['entry_name']

    # Get the new name for the entry
    new_name = request.form['new_name']

    # Rename the entry
    os.rename(entry_name, new_name)

    # Redirect the user back to the main file list
    return redirect('/')


@app.route('/usb')
def usb():
    # Run the shell script using subprocess
    output = subprocess.check_output(["wmic", "diskdrive", "get", "serialnumber"], shell=True).decode().replace("\r","").replace("SerialNumber  ","").replace(" ","")

    # Convert the output to a string
    #output_str = output.decode('utf-8')

    # Return the output as a response
    #return render_template('lock_screen.html' , output = output_str)
    return output

def main():
    u = usb()
    print(u)


if __name__ == '__main__':
    app.run()
    # main()
