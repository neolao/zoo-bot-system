class zoo-bot-server {
    # Requirement
    package { ['git']:
        ensure => installed,
    }

    # Copy files
    file { '/opt/zoo-bot-server':
        ensure => 'directory',
        source => 'puppet:///modules/zoot-bot-server'
    }

    # Installation
    class { 'nodejs::npm':
        command => 'install'
    }

    # Create the service
    file { '/etc/init.d/zoo-bot-server':
        ensure => link,
        target => '/opt/zoo-bot-server/scripts/service.sh',
    }

    # Ensure that the service is running
    service { 'zoo-bot-server':
        ensure => running,
        provider => 'service'
    }
}
