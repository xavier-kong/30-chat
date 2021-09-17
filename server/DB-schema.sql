CREATE TABLE users (
  user_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	passwordhash VARCHAR(200) NOT NULL,
  creation_date TIMESTAMP NOT NULL,
  UNIQUE(user_uid),
  UNIQUE(username),
  UNIQUE(passwordhash)
);

CREATE TABLE groups (
	group_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
	group_name VARCHAR(100) NOT NULL,
	passphrase VARCHAR(200) NOT NULL,
  creation_date TIMESTAMP NOT NULL,
  UNIQUE(group_uid),
  UNIQUE(group_name),
  UNIQUE(passphrase)
);

CREATE TABLE chat (
	message_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
  creation_date TIMESTAMP NOT NULL,
  content VARCHAR(999999) NOT NULL,
  group_uid UUID REFERENCES groups(group_uid),
  user_uid UUID REFERENCES users(user_uid)
);

CREATE TABLE user_groups (
  group_uid UUID REFERENCES groups(group_uid),
  user_uid UUID REFERENCES users(user_uid),
  login_time TIMESTAMP NOT NULL
);