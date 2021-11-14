import { BigInt } from "@graphprotocol/graph-ts"
import {
  UniPool,
  OwnershipTransferred,
  RewardAdded,
  RewardPaid,
  Staked,
  Withdrawn
} from "../generated/UniPool/UniPool"
import {Distribution, ExampleEntity} from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {

}

export function handleRewardAdded(event: RewardAdded): void {}

export function handleRewardPaid(event: RewardPaid): void {
  const entity = new Distribution(event.transaction.hash.toHex() +"-" + event.logIndex.toString())
  entity.amount = event.params.reward;
  entity.address = event.params.user.toHex()
  entity.source = 'unipool'
  entity.save();
}

export function handleStaked(event: Staked): void {}

export function handleWithdrawn(event: Withdrawn): void {}
