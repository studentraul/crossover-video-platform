import SessionActions from '../../controllers/SessionActions'
import localStorage from 'mock-local-storage'
global.window = {}
window.localStorage = global.localStorage

describe('Testing SessionActions', () => {
  const session = new SessionActions()

  describe('EncryptPassword', () => {
    it('should throw when not passed a password', () => {
      const validationRegex = /password is required/gi
      expect(() => session.encryptPassword()).toThrow(validationRegex)
    })
    it('should return an encrypted password by MD5', () => {
      expect(session.encryptPassword('senha')).toEqual(
        'e8d95a51f3af4a3b134bf6bb680a213a',
      )
    })
  })

  describe('LocalStorage actions', () => {
    const token = '123123'
    const username = 'mockedTest'

    beforeEach(() => {
      session.setUser(token, username)
    })

    describe('Throws', () => {
      it('should throw when passed no args', () => {
        const validationRegex = /token and username is required/gi
        expect(() => session.setUser()).toThrow(validationRegex)
        expect(() => session.setUser(undefined, undefined)).toThrow(
          validationRegex,
        )
        expect(() => session.setUser(null, null)).toThrow(validationRegex)
        expect(() => session.setUser('', '')).toThrow(validationRegex)
      })

      it('should throw when not passed token', () => {
        const validationRegex = /token is required/gi
        expect(() => session.setUser(null, username)).toThrow(validationRegex)
        expect(() => session.setUser(undefined, username)).toThrow(
          validationRegex,
        )
        expect(() => session.setUser('', username)).toThrow(validationRegex)
      })

      it('should throw when not passed username', () => {
        const validationRegex = /username is required/gi
        expect(() => session.setUser(token, null)).toThrow(validationRegex)
        expect(() => session.setUser(token, undefined)).toThrow(validationRegex)
        expect(() => session.setUser(token, '')).toThrow(validationRegex)
      })
    })
    it('should return token and username when save user', () => {
      const userReceived = session.setUser(token, username)
      const userSent = { token, username }

      expect(userReceived).toEqual(userSent)
    })

    it('should save token and username into localstorage', () => {
      expect(window.localStorage.getItem('auth-token')).toEqual(token)
      expect(window.localStorage.getItem('username')).toEqual(username)
    })

    it('should remove token and username from localstorage', () => {
      session._cleanUserSession()

      expect(window.localStorage.getItem('auth-token')).toBeNull()
      expect(window.localStorage.getItem('username')).toBeNull()
    })

    it('should return the same token passed', () => {
      expect(session.userToken).toEqual(token)
    })
    it('should return the same username passed', () => {
      expect(session.username).toEqual(username)
    })
  })

  describe('Fetch API', () => {
    describe('SignIn', () => {
      describe('Throws', () => {
        it('should throw when passed no args', () => {
          const validationRegex = /username and password is required/gi
          expect(() => session.signIn()).toThrow(validationRegex)
          expect(() => session.signIn(undefined, undefined)).toThrow(
            validationRegex,
          )
          expect(() => session.signIn(null, null)).toThrow(validationRegex)
          expect(() => session.signIn('', '')).toThrow(validationRegex)
        })

        it('should throw when do not pass a username', () => {
          const validationRegex = /username is required/gi
          expect(() => session.signIn(null, 'myPassword')).toThrow(
            validationRegex,
          )
          expect(() => session.signIn(undefined, 'myPassword')).toThrow(
            validationRegex,
          )
          expect(() => session.signIn('', 'myPassword')).toThrow(
            validationRegex,
          )
        })

        it('should throw when do not pass password', () => {
          const validationRegex = /password is required/gi
          expect(() => session.signIn('MyUser', null)).toThrow(validationRegex)
          expect(() => session.signIn('MyUser', undefined)).toThrow(
            validationRegex,
          )
          expect(() => session.signIn('MyUser', '')).toThrow(validationRegex)
        })
      })
      describe('Success State', () => {
        beforeAll(()=>{
          global.fetch = jest.fn().mockImplementation((url,requestInfo) => {
            const {username,password} = JSON.parse(requestInfo.body)
            return new Promise((resolve, reject) => {
              resolve({
                ok: true,
                Id: '123',
                json: function() {
                  return {
                    status: 'success',
                    sessionId: password,
                    username,
                  }
                },
              })
            })
          })
        })

        it('should return success state', async () => {
          const response = await session.signIn('myuser', 'password')
          expect(response.status).toBe('success')
        })
      });
    })
  })
})
