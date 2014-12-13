#!/bin/bash
set -e

TOPIC_URL="http://www.raspberrypi.org/forums/viewtopic.php?p=462982"

# Download and install rpi driver for 8188eu-based wifi dongles
# from MrEngman's dropbox.
#
# Version information is fetched from TOPIC_URL and appears as:
#
#   3.6.11+ #371 up to #520 inclusive    - 8188eu-20130209.tar.gz
#   3.6.11+ #524, #528, #532             - 8188eu-20130815.tar.gz
#   ...
# then is matched against local kernel release and version numbers
# to select proper driver tarball.  Kernel build number can be overriden
# with command line option -k, in case no exact match is found.

fetch_versions() {
	curl -s "$TOPIC_URL" \
	| sed 's:<code>\|</code>\|<br />:\n:g' \
	| sed 's:&nbsp;: :g ; s:gz.*:gz:' \
	| grep -E '^[0-9.]+.*tar\.gz'
}


case "$1" in
	-k|--kernel)
		build=$2
		;;
	-l|--list)
		fetch_versions
		exit 0
		;;
	-h|--help)
		echo "usage: `basename $0`" \
			"[-k|--kernel <kernel build>]" \
			"[-l|--list]"
		exit 0
		;;
	"")
		;; # proceed to install
	*)
		echo "unknown command: $1" >&2
		$0 --help
		exit 1
		;;
esac


kernel=$(uname -r)
build=${build:-$(uname -v | awk '{print $1}' | tr -d '#')}

if [ $kernel = "3.6.11+" ] && [ $build -gt 370 ] && [ $build -lt 521 ] ; then
	tarfile=8188eu-20130209.tar.gz
else
	tarfile=$(fetch_versions \
		| grep -e "^$kernel " \
		| grep -E "#$build[, ]" \
		| awk '{print $NF}')
fi

if [ ! "$tarfile" ] ; then
	echo "cannot match kernel: $kernel #$build"
	echo "please check news at $TOPIC_URL"
	echo "or try closest compatible version with -k <kernel build>"
	exit 1
fi

tmpdir=$(mktemp -d)
trap "\rm -rf $tmpdir" EXIT
cd $tmpdir

echo "downloading $tarfile (kernel $kernel #$build)"
curl -s https://dl.dropboxusercontent.com/u/80256631/$tarfile | tar xz

module_bin="8188eu.ko"
module_dir="/lib/modules/$kernel/kernel/drivers/net/wireless"
firmware_bin="rtl8188eufw.bin"
firmware_dir="/lib/firmware/rtlwifi"

if [ -f $firmware_bin ] ; then
	echo "installing firmware $firmware_bin"
	sudo install -p -m 644 $firmware_bin $firmware_dir
fi

echo "installing kernel module $module_bin"
sudo install -p -m 644 $module_bin $module_dir
sudo depmod -a
#sudo modprobe -r 8188eu || true # cannot currently be removed ("permanent")
sudo modprobe -i 8188eu
lsmod | grep -q 8188eu || echo "error: module not loaded"
