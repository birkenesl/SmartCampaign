#!/bin/bash

export SECRET_KEY_BASE=2hhuqTzLfMxlQeil+7/qrDUq8Br2sIhe68h83eTYAKaYcutTSOBhCn3KpnvlEFs7

export MIX_ENV=prod
export PORT=4799

#CFGD=$(readlink -f ~/.config/events)

#if [ ! -e "$CFGD/base" ]; then
#	echo "run deploy first"
#	exit 1
#fi

#DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://smart_texts:tempPassword@localhost/smart_texts_prod


#SECRET_KEY_BASE=$(cat "$CFGD/base")
#export SECRET_KEY_BASE

echo "Stopping old copy of app, if any..."

_build/prod/rel/smart_texts/bin/smart_texts stop || true

echo "Starting app..."

_build/prod/rel/smart_texts/bin/smart_texts start
