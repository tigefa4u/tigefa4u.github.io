#!D:\Python27\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'Sphinx==1.2b3dev-20131014','console_scripts','sphinx-build'
__requires__ = 'Sphinx==1.2b3dev-20131014'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('Sphinx==1.2b3dev-20131014', 'console_scripts', 'sphinx-build')()
    )
