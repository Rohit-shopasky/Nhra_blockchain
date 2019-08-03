
set -ev


export MSYS_NO_PATHCONV=1


docker-compose up -d 
docker ps -a


export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec -e "CORE_PEER_LOCALMSPID=NhraMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Nhra.example.com/msp" peer0.Nhra.example.com peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx

# Join peer0.Manufacturer.example.com to the channel.

docker exec -e "CORE_PEER_LOCALMSPID=NhraMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Nhra.example.com/msp" peer0.Nhra.example.com peer channel join -b mychannel.block


docker cp peer0.Nhra.example.com:/opt/gopath/src/github.com/hyperledger/fabric/mychannel.block mychannel.block

docker cp mychannel.block peer0.Hco.example.com:/opt/gopath/src/github.com/hyperledger/fabric/
docker cp mychannel.block peer0.Hcp.example.com:/opt/gopath/src/github.com/hyperledger/fabric/




docker exec -e "CORE_PEER_LOCALMSPID=HcoMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Hco.example.com/msp" peer0.Hco.example.com peer channel join -b mychannel.block

docker exec -e "CORE_PEER_LOCALMSPID=HcpMSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@Hcp.example.com/msp" peer0.Hcp.example.com peer channel join -b mychannel.block





