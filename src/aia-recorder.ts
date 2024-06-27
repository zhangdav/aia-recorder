import {
  InteractionRecorded as InteractionRecordedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/AIARecorder/AIARecorder"
import { InteractionRecorded, OwnershipTransferred } from "../generated/schema"

export function handleInteractionRecorded(
  event: InteractionRecordedEvent
): void {
  let entity = new InteractionRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.contractAddress = event.params.contractAddress
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
