type ResponseBody = {
  error?: string;
  path?: string;
  statusCode: number;
  timestamp: string;
  success: boolean;
  status: 'Fail' | 'Success';
  data?: any;
};
