# 30chat

[![Tests](https://github.com/xavier-kong/30-chat/actions/workflows/test.yml/badge.svg)](https://github.com/xavier-kong/30-chat/actions/workflows/test.yml)

It is now deployed at thirtychat30.herokuapp.com!

30chat is a project aimed at solving a problem I encountered in my daily life. I love doing activities with my friends, however planning them can be quite difficult.
Current options include:

- direct message, call everyone involved, one by one. This is one of the most inefficient methods as information travels slowly and assymetrically. Especially when multiple ideas need to be exchanged, this option does poorly. However the benefits of this method is that the user can very specifically indicate which people they would like to include.
- planning within a large group chat. Depending on the social circle, there may be a group chat containing a large number of people. Planning activities here can be convenient as involved parties would potentially all have access to the information needed and ideas can viewed by everyone. However, not all members of the group chat might be participating in the activity and so group chat becomes populated with useless messages. People would be tempted to the mute the group and miss out on potentially important messages at other times, essentially defeating the purpose of creating one in the first place.
- creating a small group chat. This method allows for only the required parties to be present in the group chat and the participants can be chosen by the group creator. This allows for the ease of information sharing as seen in large groups as well as the confidentiality of direct messaging. While this method works very well in theory, I've observed two key issues with it. Firstly, participant administration is very difficult due to social reasons. Unless you have the exact same social group for every single activity, adding and removing members is a key issue which may potentially upset people. Secondly, "group chat fatigue" can be a real thing. This occurs when the user is part of too many group chats to the extent where they choose to ignore group chats and will not create new ones.

Therefore. I decided to create 30chat. This project utilizes the strengths of the above solutions as well offering a potential fix to their issues. 30chat will do so with the following features:

- create temporary group chats that are deleted after 30 minutes
- a user can create a group chat that can only be accessed by people who have the link and password phrase

There will be 3 tables, one for tracking user information, one for tracking group chats and one for tracking which users are in which groups.

The user table will track:

- user nickname / username
- user password hashes
- user creation date (for deletion after appropriate interval)

The group chat table will track:

- group chat name
- group passphrase for joining
- group chat creation date (for deletion after appropriate interval)

The group/user info table will track:

- username
- group
- login time

I plan to use:

- React to build the frontend user interface
- Express for the server with socket.io for real time support
- PostgreSQL for data persistence
- Heroku for deployment
- Github actions for deployment pipeline
- Jest/Cypress for testing

While I orignally planned to include a table to track all messages, I realized that this feature would be going against the reasoning behind this app. While it would be useful to recall previous messages, the aim of this app was allow people to collaborate on ideas spontaneously rather than having to slog through rows and rows of messages.