# Destination System Setup Guide

## Files Created/Modified:

### 1. components/preferences-modal.tsx ✅ CREATED

- Shows 3 preference questions (travel types, month, budget)
- Modal form to collect user preferences
- Skip option available

### 2. lib/preferences.ts ✅ CREATED

- saveUserPreferences() - Saves to user metadata
- getUserPreferences() - Retrieves saved preferences

### 3. lib/destinations.ts ✅ CREATED

- DESTINATIONS array with 6 sample destinations
- filterDestinations() function
- getDestinationById() function

## Files TO UPDATE:

### 4. app/auth/signup/page.tsx - NEEDS UPDATE

Add these imports at the top:

```tsx
import PreferencesModal, {
  UserPreferences,
} from "@/components/preferences-modal";
import { saveUserPreferences } from "@/lib/preferences";
```

Add these state variables in the component:

```tsx
const [showPreferences, setShowPreferences] = useState(false);
const [savingPreferences, setSavingPreferences] = useState(false);
```

Add this function before the return:

```tsx
async function handleSavePreferences(preferences: UserPreferences) {
  setSavingPreferences(true);
  try {
    const result = await saveUserPreferences(preferences);
    if (result.success) {
      router.push("/destinations");
      router.refresh();
    } else {
      setError(result.error || "Failed to save preferences");
    }
  } catch (error) {
    console.error("Error saving preferences:", error);
    setError("An error occurred while saving preferences");
  } finally {
    setSavingPreferences(false);
  }
}
```

Change the redirect after successful signup from:

```tsx
router.push("/");
router.refresh();
```

To:

```tsx
setShowPreferences(true);
```

Add before the closing `</div>`:

```tsx
<PreferencesModal
  isOpen={showPreferences}
  onClose={() => {
    setShowPreferences(false);
    router.push("/destinations");
    router.refresh();
  }}
  onSave={handleSavePreferences}
/>
```

### 5. app/destinations/page.tsx - REPLACE ENTIRE FILE

Replace all content with the new destinations page (uses preferences and filters)

### 6. app/destinations/[id]/page.tsx - UPDATE

The existing detail page should work, but we need to check it shows full details for the new destination format
