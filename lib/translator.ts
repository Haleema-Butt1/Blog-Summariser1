const urduDictionary: Record<string, string> = {
  'the': 'وہ',
  'a': 'ایک',
  'an': 'ایک',
  'is': 'ہے',
  'are': 'ہیں',
  'was': 'تھا',
  'were': 'تھے',
  'this': 'یہ',
  'that': 'وہ',
  'and': 'اور',
  'or': 'یا',
  'but': 'لیکن',
  'blog': 'بلاگ',
  'post': 'پوسٹ',
  'article': 'مضمون',
  'read': 'پڑھیں',
  'more': 'مزید',
  'technology': 'ٹیکنالوجی',
  'trends': 'رجحانات',
  'development': 'ترقی',
  'future': 'مستقبل',
  'hello': 'ہیلو',
  'world': 'دنیا',
  'summary': 'خلاصہ',
  'text': 'تحریر',
  'content': 'مواد',
  'web': 'ویب',
  'page': 'صفحہ',
  'site': 'سائٹ',
  'information': 'معلومات',
  'data': 'ڈیٹا',
  'important': 'اہم',
  'key': 'اہم',
  'points': 'نکات',
  'discusses': 'بحث کرتا ہے',
  'explains': 'وضاحت کرتا ہے',
  'covers': 'کا احاطہ کرتا ہے',
  'about': 'کے بارے میں'
}

export const translateToUrdu = (text: string): string => {
  return text.split(' ').map(word => {
    // Preserve punctuation and numbers
    if (/^[^\w]|\d+$/.test(word)) return word
    
    // Translate known words, keep unknown as-is
    return urduDictionary[word.toLowerCase()] || word
  }).join(' ')
}