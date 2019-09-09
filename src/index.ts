import { AsyncStorage } from 'react-native'
import { StorageAdapter, AuthProviderConfig, User } from '@polvo-labs/react-auth'

export default class AsyncStorageAdapter implements StorageAdapter {
  async hasUser (config: AuthProviderConfig): Promise<boolean> {
    const user = await AsyncStorage.getItem(`${config.namespace}.user`)
    return !!user
  }

  async getUser (config: AuthProviderConfig): Promise<User> {
    const result = await AsyncStorage.getItem(`${config.namespace}.user`)

    if (!result) {
      throw new Error('User not found in AsyncStorage')
    }

    const user: User = JSON.parse(result)

    return Promise.resolve({
      email: user.email,
      token: user.token
    })
  }

  async setUser (user: User, config: AuthProviderConfig): Promise<void> {
    return AsyncStorage.setItem(
      `${config.namespace}.user`,
      JSON.stringify(user)
    )
  }

  async clearUser (config: AuthProviderConfig): Promise<void> {
    return AsyncStorage.removeItem(`${config.namespace}.user`)
  }
}
