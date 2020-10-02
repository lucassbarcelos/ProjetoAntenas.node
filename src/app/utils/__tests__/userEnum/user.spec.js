const userEnum = require('../../userEnum')

const getNameByValue = (value) =>
  userEnum.find((user) => user.value === value)?.name

describe('utils/userEnum -> userEnum', () => {
  it('should contain productOwner, cadiOwner, studentOwner and teacherOwner', () => {
    const owners = ['productOwner', 'cadiOwner', 'studentOwner', 'teacherOwner']

    userEnum.forEach(({ name }, index) => expect(name).toEqual(owners[index]))
  })

  it('should return productOwner as name when value is 1', () =>
    expect(getNameByValue(1)).toEqual('productOwner'))

  it('should return cadiOwner as name when value is 2', () =>
    expect(getNameByValue(2)).toEqual('cadiOwner'))

  it('should return studentOwner as name when value is 3', () =>
    expect(getNameByValue(3)).toEqual('studentOwner'))

  it('should return teacherOwner as name when value is 4', () =>
    expect(getNameByValue(4)).toEqual('teacherOwner'))
})
