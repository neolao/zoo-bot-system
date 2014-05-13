node base {
    package { ['wget', 'curl', 'tar', 'sudo', ]:
        ensure => present,
    }
}

node default inherits base {}
