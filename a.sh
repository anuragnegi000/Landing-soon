for i in {1..10000}; do
  curl 'https://frontend-api.pump.fun/trades/all/AXMTDmzk9r87JqygGaKsN3ocQ5sAvtV2ej84dYZJpump?limit=200&offset=0&minimumSize=50000000'
done
