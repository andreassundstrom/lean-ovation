// Name of the app
param appName string = 'lean-ovation'
// Environment name
param environment string = 'dev'
// Resource group locaiton
param location string = resourceGroup().location
// Image of lean-ovation
param leanOvationImage string = 'andreassundstrom/lean-ovation'
// Tag of lean-ovation
param leanOvationTag string = 'main'
// Registry of lean-ovation
param leanOvationRegistry string = 'docker.io'

resource appServicePlan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: 'asp-${appName}-${environment}'
  location: location
  sku: {
    name: 'F1'
    capacity: 1
  }
  properties: {
    reserved: true
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2023-12-01' = {
  name: 'as-${appName}-${environment}'
  location: location
  kind: 'app,linux,container'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://index.docker.io'
        }
      ]
      linuxFxVersion: 'DOCKER|andreassundstrom/lean-ovation:main'
    }
  }
}
