
from setuptools import setup

setup(
    name='twswebrpc',
    version='0.1.0',
    packages=['twswebrpc'],
    url='https://github.com/ldjebran/twswebrpc',
    license='Apache Version 2.0',
    author='Djebran Lezzoum',
    author_email='ldjebran@gmail.com',
    description='Twisted web JSON RPC Client and Resource',
    install_requires=['zope.interface', 'twisted']
)
