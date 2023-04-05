# Champdle
An Infinite game about LoL's Champion.

# Pre-requisites
- make
- docker.io

If you want to **install** all the pre-requisites use the command below:
```bash
$ apt install docker.io make # Debian flavored
# OR
$ yum install docker.io make # RHEL flavored
```
> The installation of packages **requires** ***elevated privileges***. You might want to use '**sudo**' as well.

# Features
## Champion's spell description
A random passive or ability is displayed on the screen.

The **player** have ***30 seconds*** (***-3 seconds*** for every combo point he have with a maxmimum of ***-15 seconds***) to guess the champion who have this ability or passive.

The **player** start with ***3 lives*** and ***1 skip***. The skip allows the **player** to skip the guess and get another one without ***losing a life***.

Every ***5 combo points*** the **player** ***heal himself for 1 life***.

Each guess make the **player** ***gain 100 Score points***. If the **player** is on a streak then he gains an additional ***50 points for each combo points*** he have.

# Makefile
## Rules
- ***all*** - Execute the start rule.
- ***up*** - Create and Start Champdle's container cluster.
- ***stop*** - Stop Champdle's container cluster.
- ***restart*** - Stop, Re-Create and Start Champdle's container cluster. 
- ***down*** - Stop and remove Champdle's container cluster.
- ***prune*** - Remove **ALL** unused images and containers.
- ***ngrok*** - Start a secure http tunnel.

# ngrok
> All rights for 'ngrok' and it's binary goes to [ngrok](https://ngrok.com/).

**ngrok** is a tool that allows you to create a secure http tunnel temporarily and gain access to it's web server on the internet.

To use **ngrok** you'll need to register on their website and follow the simple steps that are shown there. Once you've add your **auth-key** and you want to expose this web server to the world wide web simple use:
```bash
$ make ngrok
```
