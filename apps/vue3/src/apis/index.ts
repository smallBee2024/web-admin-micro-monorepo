import { http } from '@/utils/request'

export const getReviewFlow = () => {
  return http.get('/api/reviewFlow')
}