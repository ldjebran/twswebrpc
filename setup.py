
from setuptools import setup

setup(
    name='twswebrpc',
    version='0.1.0',
    platforms=['any'],
    packages=['twswebrpc'],
    zip_safe=True,
    url='https://github.com/ldjebran/twswebrpc',
    license='Apache',
    author='Djebran Lezzoum',
    author_email='ldjebran@gmail.com',
    description='Twisted JSON RPC web Client and web Resource',
    keywords='twisted rpc web json',
    install_requires=['zope.interface', 'twisted'],
    classifiers=[
        "Programming Language :: Python :: 2.7",
    ],
)
