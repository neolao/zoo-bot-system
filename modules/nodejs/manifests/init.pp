class nodejs {
    # Variables
    $nodeVersion = '0.11.6'
    #$nodePlatform = 'arm-pi'
    $nodePlatform = 'x64'

    # Requirement
    package { ['wget', 'tar']:
        ensure => installed,
    }

    # Download nodejs
    exec { 'Download nodejs archive':
        command => "wget -O /tmp/node-v${nodeVersion}.tar.gz http://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}-linux-${nodePlatform}.tar.gz",
        onlyif  => "test ! -e /tmp/node-v${nodeVersion}-linux-${nodePlatform}.tar.gz"
    }

    # Extract
    exec { 'Extract nodejs archive':
        command => "tar --directory /opt/nodejs zxf /tmp/node-v${nodeVersion}-linux-${nodePlatform}.tar.gz",
        onlyif  => "test ! -d /opt/node-v${nodeVersion}-linux-${nodePlatform}"
    }
}
