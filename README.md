# hello-darwin-bulb

This is a project to serve as a faux device for the Darwin project. It's just a web page that runs a "light bulb" and
a hub through which a translator can communicate to the "device."

There are two components to run.

## Setup

The bulb UI needs to have a unique "device sender id" - open up `bulb-ui/src/etc/config.js` and change the default
`senderId` to something presumably unique and identifiable.

Run the following commands:

    cd bulb-ui
    npm install
    cd ../hub
    npm install
    
    
Next, in different terminal processes, run `npm start` in each directory. This will give each process its own 
output window, which is more useful for debugging than combined logs would be.

Note that this project is not especially useful without having a Darwin hub running; you want to have the internet 
handler for the bulb (https://github.com/Delos-tech/Internet_Handler_HelloDarwin) running and configured, and you also
want to have the Darwin hub set up to use the translator.
