<p align="center">
      <img src="https://i.ibb.co/0QH6Z5Z/1.png" alt="Steam game price parser" width="726">
</p>

<p align="center">
   <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Project Version">
   <img src="https://img.shields.io/badge/License-M.I.T-blue" alt="License">
</p>

## About
A simple script to get the price of a specific game in all countries supported by steam
On Steam, games are not always sold at the price that your region gives out. For example, some games in Russia are sold for 900 rubles, while in Argentina, a game can cost 700 rubles.
The script works through Steam API. There is an embarrassing moment here. I don’t know how platform protection sooner or later starts blocking your IP for a large number of requests, so set the delay in the script wisely and add 30-50 countries - NO MORE

## Documentation

### Install:
First, upload the project to any folder convenient for you. </br>
After that, you need to have the Node.js platform on the device where you uploaded the project.</br>
After that, you need to install the necessary dependencies, they are located in the requirements.txt file

### Set-up:
For correct operation, you need to fill in the config.js file - it is located in the settings folder.
package_id - ID of the product in the Steam store</br>
currency_code - the currency code of your country (this code is required so that the received price, for example in Argentina, is converted into the currency of your country)</br>
delay - delay between requests
</br>
This is where the countryCodes.json file comes in. This file is required to download those country codes for which you need to get information.</br>The folder contains a file with all the codes of all countries that Steam supports for your convenience.

## Developers

- [Vladimir Sidorik - Github](https://github.com/vsidorik)
- [Vladimir Sidorik - Vk](https://vk.com/sidorikv)

## License

Project Steam Game Price Parser ( SGP ) is distributed under the MIT license.
