# Copyright 2013 Djebran Lezzoum All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Encoders encode python data to string
and strings to python data
"""

import json

from zope.interface import Interface
from zope.interface import implementer

from twisted.spread.jelly import jelly, unjelly, SecurityOptions
from twisted.spread.banana import encode as bananaEncode
from twisted.spread.banana import decode as bananaDecode


class IEncoder(Interface):
    """
    json encoder/decoder
    """

    def encode(self, data):
        """


        :param data: python data to encode
        :return: encoded string data
        """

    def decode(self, data):
        """

        :param data: string data
        :return: python data
        """


@implementer(IEncoder)
class JSONEncoder(object):

    def encode(self, data):
        return json.dumps(data)

    def decode(self, data):
        return json.loads(data)


@implementer(IEncoder)
class JellyEncoder(object):
    """this i an experimental version, using twisted matrix jelly and banana to serialize data.
    """

    def encode(self, data):
        security = SecurityOptions()
        security.allowBasicTypes()
        jellyMessage = jelly(data, taster=security)
        return bananaEncode(jellyMessage)

    def decode(self, data):
        security = SecurityOptions()
        security.allowBasicTypes()
        bananaMessage = bananaDecode(data)
        return unjelly(bananaMessage, taster=security)
