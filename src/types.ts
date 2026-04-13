// KOIST Website - Type Definitions

export type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
  JWT_SECRET?: string;
};

export type Variables = {
  admin?: { id: number; username: string };
};

export type SiteSetting = {
  id: number;
  key: string;
  value: string;
  category: string;
  description: string;
  updated_at: string;
};

export type Popup = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  popup_type: string;
  width: number;
  height: number;
  position_top: number;
  position_left: number;
  start_date: string;
  end_date: string;
  is_active: number;
  sort_order: number;
};

export type Department = {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  image_url: string;
  header_bg_url: string;
  sort_order: number;
  is_active: number;
};

export type DepPage = {
  id: number;
  dept_id: number;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  sort_order: number;
  is_active: number;
};

export type Notice = {
  id: number;
  title: string;
  content: string;
  is_pinned: number;
  views: number;
  created_at: string;
  updated_at: string;
};

export type ProgressItem = {
  id: number;
  category: string;
  product_name: string;
  company: string;
  status: string;
  assurance_level: string;
  cert_type: string;
  eval_type: string;
  start_date: string;
  end_date: string;
  note: string;
  sort_order: number;
  created_at: string;
};

export type Download = {
  id: number;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  file_size: number;
  category: string;
  download_count: number;
  created_at: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: number;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: string;
  admin_reply: string;
  replied_at: string;
  created_at: string;
};

export type AdminUser = {
  id: number;
  username: string;
  password_hash: string;
  salt: string;
  must_change_password: number;
  last_login: string;
};

// Settings를 key-value 맵으로
export interface AboutPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ImageRecord = {
  id: number;
  file_name: string;
  original_name: string;
  r2_key: string;
  mime_type: string;
  file_size: number;
  width: number;
  height: number;
  category: string;
  alt_text: string;
  created_at: string;
};

export type SettingsMap = Record<string, string>;

export type DepartmentWithPages = Department & {
  pages: Pick<DepPage, 'id' | 'title' | 'slug' | 'sort_order'>[];
};

export type SimCertType = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  traditional_min_weeks: number;
  traditional_max_weeks: number;
  koist_min_weeks: number;
  koist_max_weeks: number;
  description: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
};
