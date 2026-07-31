export interface EntryItem {
  href: string;
  title: string;
  date?: Date;
  summary?: string;
  tags?: string[];
  /** Tarihin yanında görünen küçük etiket, ör. "çalışma" */
  extra?: string;
}
