node base {
    # Install the server
    include zoo-bot-server

    # ...
    package { ['wget', 'curl', 'tar', 'sudo', ]:
        ensure => present,
    }
}

node default inherits base {}
