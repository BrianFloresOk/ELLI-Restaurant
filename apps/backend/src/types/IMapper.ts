export interface IMapper<Domain, Persistence> {
    toDomain(entity: Persistence): Domain;
    toPersistence(domain: Domain): Persistence;
}