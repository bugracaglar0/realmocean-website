import { ID, Services } from '@realmocean/sdk'
import config from './config'

const uniqueIds = {
  organisationId: ID.unique(),
  projectId: ID.unique(),
}

export async function createProjectNewVersion(
  projectName: string,
  projectDescription: string,
  organisationName: string,
  databaseName: string
) {
  const Database = 'ÖrnekDB_' + uniqueIds.projectId // Benzersiz bir veritabanı adı oluştur

  var organization
  try {
    organization = await Services.Teams.create(
      uniqueIds.organisationId,
      organisationName
    )
    console.log('yeni oluşturulan organizasyon: ', organization)
  } catch (e) {
    organization = await Services.Teams.get(uniqueIds.organisationId)
    console.log('organizasyon zaten var, olan organizasyon: ', organization)
  }
  if (!organization) return

  Services.Accounts.updatePrefs({ organization: organization.$id })

  var realm
  try {
    realm = await Services.Projects.create(
      uniqueIds.projectId,
      projectName,
      organization.$id
    ) //proje oluştur, AppInfo.Name, verilen projectId değeri
    console.log('yeni oluşturulan proje: ', realm)
  } catch (e) {
    //proje zaten varsa
    console.log('proje oluşturulamadı error: ', e)
    realm = await Services.Projects.get(projectName)
  }

  if (!realm) return

  Services.Client.setMode('admin')

  var database
  try {
    database = await Services.Databases.create(
      realm.$id,
      databaseName, //databaseid, unique te olabilir burda farketmez pek diye isimle aynı yapıldı
      databaseName //database adı
    )
  } catch (e) {
    console.log('database oluşturulamadı error: ', e)
    database = await Services.Databases.get(realm.$id, databaseName)
  }
  if (!database) return

  //elde ettiğin database objesi ile eklemeler çıkarmalar yapacaksın daha sonra
  // Services.Databases.createCollection() ile tablolar oluturabilirsi

  //Kodları bu araya yazıcan aşağıda istediğin şeyleri return edicen
  //Kodları bu araya yazıcan aşağıda istediğin şeyleri return edicen
  //Kodları bu araya yazıcan aşağıda istediğin şeyleri return edicen

  return {
    organization,
    realm,
    database,
  }
}

export async function getProjects() {
  try {
    const response = await Services.Databases.listCollections(
      config.databaseId,
      config.databaseName
    )
    console.log('Projeler çekildi:', response)
    return response.collections
  } catch (error) {
    console.error('Projeleri çekme hatası:', error)
    throw error
  }
}

export async function createNewProject(
  projectId: string,
  projectName: string,
  teamId: string
) {
  try {
    return await Services.Projects.create(projectId, projectName, teamId)
  } catch (e) {
    console.log(e)
  }
}

export class DatabaseSetup {
  async createOrganization(name: string) {
    const organization = await Services.Teams.create(ID.unique(), name)
    console.log('Organizasyon Oluşturuldu: ', organization.name)
    return organization.$id
  }

  async createDatabase(organizationId: string, dbName: string) {
    const database = await Services.Databases.create(
      organizationId,
      dbName,
      dbName
    )
    console.log('Veritabanı Oluşturuldu: ', database.name)
    return database.$id
  }

  async createCollection(
    databaseId: string,
    collectionName: string,
    description: string,
    additionalConfig: string
  ) {
    const collection = await Services.Databases.createCollection(
      databaseId,
      collectionName,
      description,
      additionalConfig
    )
    console.log('Koleksiyon Oluşturuldu: ', collection.name)
    return collection.$id
  }
}
