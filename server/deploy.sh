#!/bin/bash

export SECRET_KEY_BASE=2hhuqTzLfMxlQeil+7/qrDUq8Br2sIhe68h83eTYAKaYcutTSOBhCn3KpnvlEFs7

export MIX_ENV=prod
export PORT=4799

export DATABASE_URL=ecto://smart_texts:tempPassword@localhost/smart_texts__prod
echo "Building..."


mix deps.get --only prod
mix compile

#CFGD=$(readlink -f ~/.config/events)


#if [! -d "$CFGD" ]; then
#	mkdir -p "$CFGD"
#fi

#if [! -e "$CFGD/base" ]; then
#	mix phx.gen.secret > "$CFGD/base"
#fi

#if [! -e "$CFGD/db_pass" ]; then
#	eventstneve > "$CFGD/db_pass"
#fi

export SECRET_KEY_BASE


export DATABASE_URL=ecto://smart_texts:tempPassword@localhost/smart_texts__prod
mix ecto.reset
mix ecto.migrate

mix phx.digest

mix release
