package store.jackgnome.djarenaservice.utils

import java.util.UUID

fun getOrNull(uuid: String): UUID? = try {
    UUID.fromString(uuid)
} catch (ignore: IllegalArgumentException) {
    null
}