/**
 * API Service Tests
 * Tests for fetchProducts with various scenarios
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fetchProducts, ApiError } from '../api'

// Mock fetch
global.fetch = vi.fn()

describe('fetchProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should limit the number of products returned', async () => {
    const mockResponse = {"widget":{"data":{"model_info":{"775187":{"id":775187,"brand":"Microsoft","model_name":"Xbox Series X","requested_model":"xbox_series_x","model_image_url":"https:\/\/m.media-amazon.com\/images\/I\/31sh9XqMZxL._SL500_.jpg","name":"Microsoft Xbox Series X","verdict":"The Xbox Series X utilizes its powerful specs to significantly reduce load times and improve game performance and visual fidelity. But while features such as Quick Resume and extensive backward compatibility give it an edge, it\u2019s lacking in key areas \u2013 notably, significant UI improvements and captivating exclusives.","retailer_verdict":null,"manufacturer_verdict":null,"pros":["SSD grants super-fast load times","Dolby Vision and Atmos support","Supports up to 4K\/120Hz","Best-in-class backward compatibility"],"cons":["Exclusives lacking without Game Pass","Minimal UI improvements"],"score":8,"review_link":"https:\/\/techradar.com\/reviews\/xbox-series-x","parents":[{"id":287135,"name":"Game Consoles"},{"id":286520,"name":"Gaming"},{"id":286325,"name":"Electronics"},{"id":1,"name":"Everything"}],"child_count":null,"reviews":[],"pull_quote":null}},"title":"Microsoft Xbox Series X","last_update":1762328903,"counts":{"broadband":0,"subscriptions":0,"contracts":0,"deals":6,"accessories":0,"fallback":0,"offers":0,"vouchers":0,"unique_codes":0,"offer_deals":0,"newsletter":0,"similar":1,"multimedia":0,"rewards":0},"offers":[{"id":783697937,"match_id":783697937,"product_key":"72278-41465281600","score":18236,"percentage":95,"click_count":4,"click_count_weekly":7,"click_count_monthly":95,"product_type":1000,"bundle_models":[],"model_matched":["Microsoft Xbox Series X"],"requested_model":"xbox_series_x","model":"Microsoft Xbox Series X","model_id":775187,"an":"AW","offer":{"name":"Microsoft Xbox Series X Digital Robot White","price":"449.99","in_stock":true,"stock_quantity":null,"currency_iso":"GBP","currency_symbol":"&pound;","link":"https:\/\/www.awin1.com\/pclick.php?clickref=hawk-custom-tracking&p=41465281600&a=103504&m=3235","link_text":"View","merchant_link_text":"View at O2 Mobiles","label":"","percentage_saving":null,"percentage_saving_label":null,"money_saving":null,"money_saving_label":null,"product_note":null,"audience":null,"display_name":"Microsoft Xbox Series X (White)","display_labels":"(White)","display_primary_label":"(White)"},"image":null,"label_image":null,"model_image":"https:\/\/m.media-amazon.com\/images\/I\/31sh9XqMZxL._SL500_.jpg","shipping":{"prime":false,"url":null},"merchant":{"id":1092,"name":"O2 Mobiles","url":"https:\/\/www.o2.co.uk\/","logo_url":"https:\/\/images.fie.futurecdn.net\/logos\/merchants\/o2-mobiles-14607154668496-100-80.png.webp","territory":"GB","preference":0},"last_update":1761439219,"labels_formatted":[{"type":"colour","value":"white","display_value":"White","display_order":7,"priority":5},{"type":"brand","value":"Microsoft","display_value":"Microsoft","display_order":99,"priority":0}]},{"id":744155058,"match_id":744155058,"product_key":"359-40970986714","score":22416,"percentage":95,"click_count":49,"click_count_weekly":478,"click_count_monthly":511,"product_type":1000,"bundle_models":[],"model_matched":["Microsoft Xbox Series X"],"requested_model":"xbox_series_x","model":"Microsoft Xbox Series X","model_id":775187,"an":"AW","offer":{"name":"MICROSOFT Xbox Series X - 1 TB, Black","price":"499.00","in_stock":true,"stock_quantity":586,"currency_iso":"GBP","currency_symbol":"&pound;","link":"https:\/\/www.awin1.com\/pclick.php?clickref=hawk-custom-tracking&p=40970986714&a=103504&m=1599","link_text":"View","merchant_link_text":"View at Currys","label":"","percentage_saving":null,"percentage_saving_label":null,"money_saving":null,"money_saving_label":null,"product_note":null,"audience":null,"display_name":"Microsoft Xbox Series X (Black SSD)","display_labels":"(Black SSD)","display_primary_label":"(Black)"},"image":"https:\/\/images.fie.futurecdn.net\/products\/7d5cd69383191feb02881f85b28e10d1cada9491-100-80.jpg.webp","label_image":null,"model_image":"https:\/\/m.media-amazon.com\/images\/I\/31sh9XqMZxL._SL500_.jpg","shipping":{"prime":false,"url":null},"merchant":{"id":413,"name":"Currys","url":"https:\/\/www.currys.co.uk\/","logo_url":"https:\/\/images.fie.futurecdn.net\/logos\/merchants\/m0ssw6c5okp1r1bl-16334238531824-100-80.png.webp","territory":"GB","preference":0},"last_update":1761874271,"labels_formatted":[{"type":"colour","value":"black","display_value":"Black","display_order":7,"priority":5},{"type":"brand","value":"Microsoft","display_value":"Microsoft","display_order":99,"priority":0},{"type":"storage_type","value":"SSD","display_value":"SSD","display_order":99,"priority":0}]},{"id":2507086,"match_id":2507086,"product_key":"26999-B08H93GKNJ","score":21656,"percentage":99,"click_count":10,"click_count_weekly":77,"click_count_monthly":152,"product_type":1000,"bundle_models":[],"model_matched":["Microsoft Xbox Series X"],"requested_model":"xbox_series_x","model":"Microsoft Xbox Series X","model_id":775187,"an":"Amazonuk","offer":{"name":"Xbox Series X","price":"499.00","in_stock":true,"stock_quantity":null,"currency_iso":"GBP","currency_symbol":"&pound;","link":"https:\/\/target.georiot.com\/Proxy.ashx?tsid=8428&GR_URL=https%3A%2F%2Fwww.amazon.co.uk%2Fdp%2FB08H93GKNJ%3Ftag%3Dhawk-future-21%26linkCode%3Dogi%26th%3D1%26psc%3D1%26ascsubtag%3Dhawk-custom-tracking-21","link_text":"View","merchant_link_text":"View at Amazon","label":"","percentage_saving":0,"percentage_saving_label":null,"money_saving":null,"money_saving_label":null,"product_note":null,"audience":null,"display_name":"Microsoft Xbox Series X (Black)","display_labels":"(Black)","display_primary_label":"(Black)"},"image":"https:\/\/images.fie.futurecdn.net\/products\/bfdd9473ec2a066b1b16c9922b0294ddbb5aed84-100-80.jpg.webp","label_image":null,"model_image":"https:\/\/m.media-amazon.com\/images\/I\/31sh9XqMZxL._SL500_.jpg","shipping":{"prime":true,"url":"https:\/\/target.georiot.com\/Proxy.ashx?tsid=8428&GR_URL=https%3A%2F%2Famazon.co.uk%2Ftryprimefree%3Ftag%3Dhawk-future-21%26ascsubtag%3Dhawk-custom-tracking-21"},"merchant":{"id":1027,"name":"Amazon","url":"https:\/\/www.amazon.co.uk\/","logo_url":"https:\/\/images.fie.futurecdn.net\/logos\/merchants\/amazon-uk-14606342093191-100-80.png.webp","territory":"GB","preference":0},"last_update":1762328903,"labels_formatted":[{"type":"colour","value":"black","display_value":"Black","display_order":7,"priority":5},{"type":"brand","value":"Microsoft","display_value":"Microsoft","display_order":99,"priority":0}]},{"id":643835681,"match_id":643835681,"product_key":"164663-43016731","score":14816,"percentage":95,"click_count":2,"click_count_weekly":0,"click_count_monthly":0,"product_type":1000,"bundle_models":[],"model_matched":["Microsoft Xbox Series X"],"requested_model":"xbox_series_x","model":"Microsoft Xbox Series X","model_id":775187,"an":"PHG","offer":{"name":"Xbox Series X console","price":"499.00","in_stock":true,"stock_quantity":null,"currency_iso":"GBP","currency_symbol":"&pound;","link":"https:\/\/selfridges.prf.hn\/click\/camref:1011loWvt\/pubref:hawk-custom-tracking\/creativeref:1011l79493\/destination:https:\/\/www.selfridges.com\/GB\/en\/cat\/microsoft-xbox-series-x-console_R03705109\/","link_text":"View","merchant_link_text":"View at Selfridges","label":"","percentage_saving":null,"percentage_saving_label":null,"money_saving":null,"money_saving_label":null,"product_note":null,"audience":null,"display_name":"Microsoft Xbox Series X","display_labels":"","display_primary_label":""},"image":"https:\/\/images.fie.futurecdn.net\/products\/8d50696e8930ef5158ca566d6e8ab69bb3155b96-100-80.jpg.webp","label_image":null,"model_image":"https:\/\/m.media-amazon.com\/images\/I\/31sh9XqMZxL._SL500_.jpg","shipping":{"prime":false,"url":null},"merchant":{"id":213154,"name":"Selfridges","url":"https:\/\/www.selfridges.com","logo_url":"https:\/\/images.fie.futurecdn.net\/rzfy2mzlpt8nds2o-16528792314819-100-80.png.webp","territory":"GB","preference":0},"last_update":1761547791,"labels_formatted":[{"type":"brand","value":"Microsoft","display_value":"Microsoft","display_order":99,"priority":0}]}],"offer_types":["deals"],"offer_type":"deals","event":null,"sponsor":null,"filters":[{"category":"merchant","type":"merchant","title":"Merchant","filter_key":"filter_merchant_name","multi_select":true,"priority":50,"values":[{"value":"","formatted_value":"Any Merchant","count":7,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"Amazon","formatted_value":"Amazon","count":2,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"Currys","formatted_value":"Currys","count":3,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"O2 Mobiles","formatted_value":"O2 Mobiles","count":1,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"Selfridges","formatted_value":"Selfridges","count":1,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null}]},{"category":"label","type":"label_text_colour","title":"Colour","filter_key":"filter_label[text_colour]","multi_select":true,"priority":5,"values":[{"value":"","formatted_value":"Any Colour","count":5,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"black","formatted_value":"Black","count":4,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"white","formatted_value":"White","count":1,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null}]},{"category":"price","type":"upfront_cost","title":"Price","filter_key":"filter_upfront","multi_select":false,"priority":3,"values":[{"value":50,"formatted_value":"Up to \u00a350","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":100,"formatted_value":"Up to \u00a3100","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":150,"formatted_value":"Up to \u00a3150","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":200,"formatted_value":"Up to \u00a3200","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":250,"formatted_value":"Up to \u00a3250","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":300,"formatted_value":"Up to \u00a3300","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":350,"formatted_value":"Up to \u00a3350","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":400,"formatted_value":"Up to \u00a3400","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":500,"formatted_value":"Up to \u00a3500","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":600,"formatted_value":"Up to \u00a3600","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":700,"formatted_value":"Up to \u00a3700","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null},{"value":"","formatted_value":"Any Price","count":null,"image_url":null,"mobile_image_url":null,"tab_active":false,"description_heading":null,"description_value":null}]}],"pagination":{"limit":3,"limit_contracts":3,"limit_deals":4,"offset":null}}},"models":{"xbox_series_x":775187},"area":"GB","battle":null,"version":"master"}

    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const products = await fetchProducts(4)

    expect(products).toHaveLength(4)
  })

  it('should handle HTTP errors', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    try {
      await fetchProducts()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).message).toContain('HTTP error! status: 500')
    }
  })

  it('should handle invalid response structure', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    try {
      await fetchProducts()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).message).toBe('Invalid API response structure')
    }
  })

  it('should handle network errors', async () => {
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    try {
      await fetchProducts()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).message).toBe('Network error')
    }
  })

  it('should throw error when no valid products found', async () => {
    const mockResponse = {
      widget: {
        data: {
          offers: [],
        },
      },
    }

    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    try {
      await fetchProducts()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      expect((error as ApiError).message).toBe('No valid products found')
    }
  })

  it('should handle timeout', async () => {
    ;(global.fetch as any).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 15000)
        })
    )

    try {
      await fetchProducts()
      expect.fail('Should have thrown an error')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
    }
  }, 15000)

})

