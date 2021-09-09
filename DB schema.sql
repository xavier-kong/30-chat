CREATE TABLE user (
	user_uid UUID NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	passwordhash VARCHAR(200) NOT NULL,
  creation_date DATE NOT NULL,
  UNIQUE(user_uid),
  UNIQUE(username),
  UNIQUE(passwordhash)
);

CREATE TABLE group (
	group_uid UUID NOT NULL PRIMARY KEY,
	group_name VARCHAR(100) NOT NULL,
	passphrase VARCHAR(200) NOT NULL,
  creation_date DATE NOT NULL,
  UNIQUE(group_uid),
  UNIQUE(group_name),
  UNIQUE(passphrase)
);

CREATE TABLE chat (
	message_uid UUID NOT NULL PRIMARY KEY,
  creation_date DATE NOT NULL,
  content VARCHAR(999999) NOT NULL,
  group_uid UUID REFERENCES group(group_uid),
  user_uid UUID REFERENCES user(user_uid)
);