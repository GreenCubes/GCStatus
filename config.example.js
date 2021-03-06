module.exports = {
	
	srv: {
		main: {
			host: 'srv1.greencubes.org',
			port: 25565
		},
		api: {
			host: 'api.greencubes.org',
			port: 443
		},
		help: {
			host: 'help.greencubes.org',
			port: 443
		},
		dev: {
			host: 'dev.greencubes.org',
			port: 443
		},
		web: {
			host: 'greencubes.org',
			port: 443
		}
	},
	
	appdb: {
		host: 'localhost',
		user: 'YOUR_MYSQL_USER',
		password: 'YOUR_MYSQL_PASSWORD',
		database: 'YOUR_MYSQL_DB'
	}
	
};
