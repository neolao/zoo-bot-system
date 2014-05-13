#!/bin/bash

# Make sure only root can run this script
if [[ $EUID -ne 0 ]]; then
   echo "The script must be run as root" 1>&2
   exit 1
fi

# Install puppet
apt-get install ruby1.9.1-dev
gem install --verbose --no-ri --no-rdoc puppet
gem install --verbose --no-ri --no-rdoc librarian-puppet
librarian-puppet install

# Apply puppet
puppet apply ./manifests/nodes.pp --modulepath=./modules/ --verbose

