import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Allocate,
  Assign,
  ChangeAddress,
  Claim,
  GivBackPaid,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StartTimeChanged
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleAllocate(event: Allocate): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.distributor = event.params.distributor
  entity.grantee = event.params.grantee

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.DISTRIBUTOR_ROLE(...)
  // - contract.balances(...)
  // - contract.cancelable(...)
  // - contract.claimableAt(...)
  // - contract.claimableNow(...)
  // - contract.cliffTime(...)
  // - contract.duration(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.getTimestamp(...)
  // - contract.globallyClaimableAt(...)
  // - contract.hasRole(...)
  // - contract.initialAmount(...)
  // - contract.lockedAmount(...)
  // - contract.startTime(...)
  // - contract.supportsInterface(...)
  // - contract.token(...)
  // - contract.totalTokens(...)
}

export function handleAssign(event: Assign): void {}

export function handleChangeAddress(event: ChangeAddress): void {}

export function handleClaim(event: Claim): void {}

export function handleGivBackPaid(event: GivBackPaid): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleStartTimeChanged(event: StartTimeChanged): void {}
