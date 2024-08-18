const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([]) 
        assert.deepStrictEqual(result, null)  
    })
})