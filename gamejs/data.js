import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://nhynjiyzvhhmahbkvxwq.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeW5qaXl6dmhobWFoYmt2eHdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzkxOTYwOSwiZXhwIjoyMDEzNDk1NjA5fQ.4ctrReP3SxiuvM8j4HAWhPcZc9TdmNc2QrW1jPAHVUc')

const { data, error } = await supabase
    .from('magicwords')
    .select()

if (error == null) {
    console.log(data)
} else {
    console.log("failed")
}